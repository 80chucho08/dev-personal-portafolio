<#
  Optimiza las fotos de la sección Trayectoria.
  - Origen:  ../career-images-originals/<carpeta>/*  (originales pesados, fuera de public y del repo)
  - Destino: public/career-images/<carpeta>/<nombre>.jpg (máx. 1600 px) y <nombre>-thumb.jpg (400 px)
  - Genera src/data/careerImages.js con el listado (orden natural, con ancho y alto).
  Corrige la orientación EXIF. Uso: powershell -ExecutionPolicy Bypass -File scripts/optimize-career-images.ps1
#>
param(
  [string]$Source = (Join-Path $PSScriptRoot "..\..\career-images-originals"),
  [string]$Dest = (Join-Path $PSScriptRoot "..\public\career-images"),
  [string]$Manifest = (Join-Path $PSScriptRoot "..\src\data\careerImages.js"),
  [int]$MaxSize = 1600, [int]$ThumbSize = 400, [int]$Quality = 78, [int]$ThumbQuality = 70
)
Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName PresentationCore
$jpeg = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

function Save-Jpeg($bmp, $path, $q) {
  $p = New-Object System.Drawing.Imaging.EncoderParameters 1
  $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $bmp.Save($path, $jpeg, $p)
}
function Resize($img, $max) {
  $scale = [Math]::Min(1.0, $max / [Math]::Max($img.Width, $img.Height))
  $w = [int][Math]::Round($img.Width * $scale); $h = [int][Math]::Round($img.Height * $scale)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose(); return $bmp
}
function Load-Image($file) {
  if ($file.Extension -ieq '.cr2') {
    # RAW: requiere el códec de cámara de Windows (WIC); si no está instalado se omite.
    $dec = [System.Windows.Media.Imaging.BitmapDecoder]::Create([Uri]$file.FullName, 'PreservePixelFormat', 'OnLoad')
    $enc = New-Object System.Windows.Media.Imaging.PngBitmapEncoder
    $enc.Frames.Add($dec.Frames[0]); $ms = New-Object System.IO.MemoryStream; $enc.Save($ms); $ms.Position = 0
    return [System.Drawing.Image]::FromStream($ms)
  }
  $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
  return [System.Drawing.Image]::FromStream((New-Object System.IO.MemoryStream (, $bytes)))
}
function Apply-Orientation($img) {
  if ($img.PropertyIdList -contains 0x0112) {
    switch ($img.GetPropertyItem(0x0112).Value[0]) {
      3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') }
    }
    $img.RemovePropertyItem(0x0112)
  }
}

New-Item -ItemType Directory -Force $Dest | Out-Null
$lines = @("// Generado por scripts/optimize-career-images.ps1. No editar a mano.", "export const careerImages = {")
foreach ($dir in Get-ChildItem $Source -Directory) {
  $out = Join-Path $Dest $dir.Name; New-Item -ItemType Directory -Force $out | Out-Null
  $files = Get-ChildItem $dir.FullName -File | Where-Object { $_.Extension -imatch '^\.(jpe?g|png|cr2)$' } |
    Sort-Object { [regex]::Replace($_.BaseName, '\d+', { $args[0].Value.PadLeft(8, '0') }) }
  $items = @()
  foreach ($f in $files) {
    try {
      $name = $f.BaseName.ToLower()
      $img = Load-Image $f; Apply-Orientation $img
      $full = Resize $img $MaxSize; Save-Jpeg $full (Join-Path $out "$name.jpg") $Quality
      $thumb = Resize $img $ThumbSize; Save-Jpeg $thumb (Join-Path $out "$name-thumb.jpg") $ThumbQuality
      $items += ('    {{ src: "/career-images/{0}/{1}.jpg", thumb: "/career-images/{0}/{1}-thumb.jpg", w: {2}, h: {3} }},' -f $dir.Name, $name, $full.Width, $full.Height)
      $full.Dispose(); $thumb.Dispose(); $img.Dispose()
      Write-Host ("OK   {0}/{1}" -f $dir.Name, $f.Name)
    } catch { Write-Host ("SKIP {0}/{1}: {2}" -f $dir.Name, $f.Name, $_.Exception.Message) }
  }
  $lines += ("  {0}: [" -f $dir.Name); $lines += $items; $lines += "  ],"
}
$lines += "};"
Set-Content -Path $Manifest -Value $lines -Encoding UTF8

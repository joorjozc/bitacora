# Despliega Bitácora en Vercel.
# Uso: abre PowerShell en esta carpeta y ejecuta:  .\deploy.ps1
# Si Windows se queja de permisos:  powershell -ExecutionPolicy Bypass -File .\deploy.ps1

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

# Node se instalo con winget y a veces no esta en el PATH de la sesion actual
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  $env:PATH = "C:\Program Files\nodejs;" + $env:PATH
}

# Arregla el problema de certificados de esta red
$env:NODE_OPTIONS = "--use-system-ca"

Write-Host "==> Comprobando sesion de Vercel..." -ForegroundColor Cyan
$quien = npx --yes vercel whoami 2>$null
if (-not $?) {
  Write-Host "==> No has iniciado sesion. Se abrira el navegador para que confirmes." -ForegroundColor Yellow
  npx --yes vercel login
}

Write-Host "==> Desplegando a produccion..." -ForegroundColor Cyan
npx --yes vercel --prod --yes

Write-Host ""
Write-Host "==> Listo. La URL de arriba es la app." -ForegroundColor Green
Write-Host "    Si has cambiado cualquier fichero, sube el numero de VERSION en sw.js"
Write-Host "    antes de desplegar o los moviles seguiran viendo la version antigua."

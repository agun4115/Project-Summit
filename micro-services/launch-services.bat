@echo off
echo Starting all microservices...

echo.
echo Starting Category Service...
start "Category Service" cmd /k "cd category_service && mvnw.cmd spring-boot:run"

echo Waiting 10 seconds...
timeout /t 10 /nobreak > nul

echo Starting Cart Service...
start "Cart Service" cmd /k "cd cart_service && mvnw.cmd spring-boot:run"

echo Waiting 10 seconds...
timeout /t 10 /nobreak > nul

echo Starting Product Service...
start "Product Service" cmd /k "cd product_service && mvnw.cmd spring-boot:run"

echo Waiting 10 seconds...
timeout /t 10 /nobreak > nul

echo Starting User Service...
start "User Service" cmd /k "cd user_service && mvnw.cmd spring-boot:run"

echo.
echo All services are starting!
echo Category Service: http://localhost:8002
echo Cart Service: http://localhost:8001
echo Product Service: http://localhost:8003
echo.
echo Close the individual service windows to stop each service.
echo Press any key to exit this launcher...
pause > nul

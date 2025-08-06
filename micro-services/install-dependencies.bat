@echo off
echo Installing dependencies for all microservices...

echo.
echo Installing for Category Service...
cd category_service
call mvnw.cmd clean install
cd ..

echo.
echo Installing for Cart Service...
cd cart_service
call mvnw.cmd clean install
cd ..

echo.
echo Installing for Product Service...
cd product_service
call mvnw.cmd clean install
cd ..

echo.
echo Installing for User Service...
cd user_service
call mvnw.cmd clean install
cd ..

echo.
echo All dependencies installed for all microservices!
pause
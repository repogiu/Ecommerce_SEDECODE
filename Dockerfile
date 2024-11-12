# Usar una imagen base oficial de Python
FROM python:3.8-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos requirements.txt y app.py al contenedor de trabajo
COPY requirements.txt requirements.txt
COPY app.py app.py

# Instalar las dependencias
RUN pip install -r requirements.txt

# Copiar todo el contenido de tu proyecto al directorio de trabajo
COPY . .

# Exponer el puerto en el que correrá tu aplicación
EXPOSE 5000

# Comando para correr la aplicación
CMD ["python", "app.py"]

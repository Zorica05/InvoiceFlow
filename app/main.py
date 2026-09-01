from fastapi import FastAPI

app = FastAPI(
title="InvoiceFlow API",
description="API for managing invoices and customers",
version="1.0.0",
)

@app.get("/")
def root():
return {"message": "InvoiceFlow API is running"}

@app.get("/health")
def health_check():
return {"status": "healthy"}

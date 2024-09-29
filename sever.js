const express = require ('express')
const mongoose = require ('mongoose')
const path = require ('path')
const port = 3019

constapp =express();

appendFile.get('/',(req,res)=>{
    res.send("hello world")
})

appendFile.listen(port,()=>{
    console.log("Sever started")
})
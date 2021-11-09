import React from "react";

const postData = async (url, data) => {
    try {
        const response = await fetch("http://localhost:3000/" + url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
        return await response.json();
    } catch(err){
        return console.log(err)
    }
}

const getData = async (url) => {
    try {
        const response = await fetch("http://localhost:3000/" + url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        return await response.json();
    } catch(err){
        return console.log(err)
    }
}

export {
    getData,
    postData
}

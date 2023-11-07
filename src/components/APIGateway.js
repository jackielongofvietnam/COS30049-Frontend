import React from 'react';

class APIGateway extends React.Component{
    static AnalyzeSOLFile = async (file) => {
        try{
            const response = await fetch("http://localhost:5000/api/audit",{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({'file_name': file.file_name, 'file_content': file.file_content}),
            });
            alert(JSON.stringify({'file_name': file.file_name, 'file_content': file.file_content}));
            const data = await response.json();
            // audit response
            if (data.status === 201){       // success
                return await data.data;
            }
            else{
                return await null;
            }
        } catch (error){
            alert(error);
        }
    }

    static GetAuditHistory = async (search_param) => {
        try{
            const response = await fetch(`http://localhost:5000/api/audit-history?search=${search_param}`,{
                method: 'GET',
            });
    
            const data = await response.json();
            // audit response
            if (data.status === 201){       // success

                return await data.data.audit_history;
            }
            else{
                return await null;
            }
        } catch (error){
            alert(error);
        }
    }

    static Login = async (user_name, password) => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ 'user_name': user_name, 'password': password }),
            });
        
            // Handle the response
            // ...
        
            const data = await response.json();
    
            if (data.status === 201){
                return await data.data;
            } else {
                return await null;
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }
}

export default APIGateway;
import React from 'react';

class APIGateway extends React.Component{
    static AnalyzeSOLFile = async (file) => {
        try{
            const response = await fetch("http://localhost:5000/api/audit",{
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({'file_name': file.fileName, 'file_content': file.fileData}),
            });
    
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
}

export default APIGateway;
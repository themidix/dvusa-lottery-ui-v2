async function FetchingData (Url: string, Method: string, Body?: any): Promise<any>{
    let query: any = '';
    Method == 'POST' || 'PUT' ?
    query = fetch('http://localhost:8080/'+Url, {
        method: Method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: Body
    }) : 
    query = fetch('http://localhost:8080/'+Url, {
        method: Method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    
    const response = await query;
    if (response.ok) {
        const data = await response.json();
        return {data: data, status: response.status};
    }else {
        return {status : response.status};
    }
}
export default FetchingData;
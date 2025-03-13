console.log('connected');
const fetchData = async (url) => {
    const res = await fetch(url);
   const data = await res.json();
   displayCategory(data)
} 

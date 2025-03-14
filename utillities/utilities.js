console.log('connected');
const showLoading = () => {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
}
const hideLoading = () => {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
}
const fetchData = async (url, callbackfn) => {
   try {
       showLoading();
    const res = await fetch(url);
    const data = await res.json();
    callbackfn(data);
    callbackfn(data);
   } catch (error) {
    console.log('error is :', error);
   }finally{
    hideLoading();

   }
} 

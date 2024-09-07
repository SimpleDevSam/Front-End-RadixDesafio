function formatDate(isoDate: Date): string {
    const date = new Date(isoDate);

    const day = String(date.getUTCDate()).padStart(2, '0'); 
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();
  
    return `${year}-${month}-${day}`; 
  }

  export default formatDate
// A mock function to mimic making an async request for data
export function fetchBarang(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


export function updateFormData(url, { data, original }) {
  return new Promise((resolve) =>{
    console.log("updateForm 3",data);
    const formData = new FormData();    //formdata object
    for (const i in data) {
      if (Object.hasOwnProperty.call(data, i)) {
        const element = data[i];
        if(data[i] !== "foto" && element !== null){
          formData.append(i, original[i]);    
        }
      }
    }
    console.log("updateForm 3 update",formData);


    // fetch(url, {
    //   method: 'POST',
    //   header:{
    //     // Content-Type may need to be completely **omitted**
    //     // or you may need something
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: formData
    // }).then(
    //   response => response.json() // if the response is a JSON object
    // ).then((success) => { return success; } // Handle the success response object
    // ).catch(
    //   error => console.log(error) // Handle the error response object
    // )
    setTimeout(() => resolve({ data: data }), 500)
  });
}

export function uploadFormData(url, data) {
  return new Promise((resolve) =>{
    const formData = new FormData();    //formdata object
    for (const i in data) {
      if (Object.hasOwnProperty.call(data, i)) {
        const element = data[i];
        formData.append(i, element);    
      }
    }

    // fetch(url, {
    //   method: 'POST',
    //   header:{
    //     // Content-Type may need to be completely **omitted**
    //     // or you may need something
    //     "Content-Type": "multipart/form-data"
    //   },
    //   body: formData
    // }).then(
    //   response => response.json() // if the response is a JSON object
    // ).then((success) => { return success; } // Handle the success response object
    // ).catch(
    //   error => console.log(error) // Handle the error response object
    // )
    setTimeout(() => resolve({ data: data }), 500)
  });
}

export function deleteItems(url, data) {
  return new Promise((resolve) =>{
    // fetch(url, {
    //   method: 'Delete',
    //   header:{
    //     // Content-Type may need to be completely **omitted**
    //     // or you may need something
    //     "Content-Type": "multipart/form-data"
    //   },
    // }).then(
    //   response => response.json() // if the response is a JSON object
    // ).then((success) => { return success; } // Handle the success response object
    // ).catch(
    //   error => console.log(error) // Handle the error response object
    // )
    setTimeout(() => resolve({ data: data }), 500)
  });
}
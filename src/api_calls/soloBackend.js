// // comment to push cli
// // Calls to API provided by flask backend server
// const api_address = "http://127.0.0.1:";
// // const port = "5001";
// // const baseLink = `${api_address}${port}`;
const baseLink = "https://api.namefake.com/";

const requestHeaders = new Headers();
requestHeaders.append("Access-Control-Allow-Origin", "*");
requestHeaders.append("Accept", "application/json");
requestHeaders.append("Content-Type", "application/json");

// const fetchBrandsByList = async (listName, usedKeywords) => {
//     // link defaults to proxy defined in package.json
//     const listRequestOptions = {
//         method: "POST",
//         headers: requestHeaders,
//         body: JSON.stringify({ usedKeywords: usedKeywords }),
//     };
//     const res = await fetch(
//         `${baseLink}/brands/byList/${listName}`,
//         listRequestOptions
//     );
//     const data = await res.json();
//     console.log('\x1b[36m%s\x1b[0m', 'data:', '\n', data);
//     return { brands: data["brands"], nextKeyword: data["nextKeyword"], listInfo: data["info"] };
// };

const getData = async () => {
    console.log('triggered')
    const listRequestOptions = {
        method: "GET",
        headers: requestHeaders,
        // body: JSON.stringify({ usedKeywords: usedKeywords }),
    };
    const res = await fetch(
        `${baseLink}`,
        listRequestOptions
    );
    const data = await res.json();
    console.log('\x1b[36m%s\x1b[0m', 'data:', '\n', data);
    return data
}


// export default async function getCreditScore() {

//     try {
//         // const response = await fetch('https://solo100.herokuapp.com/score');
//         const response = await fetch('https://api.namefake.com/',
//             {
//                 mode: "no-cors",
//                 headers: {
//                     'Access-Control-Allow-Origin': '*'
//                 }
//             }
//         );
//         const res = await response.json();
//         console.log(res)
//         return res
//     } catch (error) {
//         console.log("Hit error")
//         console.log(error)

//         return [];
//     }

// }

export default {
    getData
}
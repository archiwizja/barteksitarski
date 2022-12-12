class Tools {
    static printList = (list) => {
        list.forEach(element => {
            console.log(element)
        })
    }
    static printObjectKeys = (obj) => {
        Object.keys(obj).forEach(element => {
            console.log(element)
        })
    }
    static printObjectValues = (obj) => {
        Object.values(obj).forEach(element => {
            console.log(element)
        })
    }
    static printObjectEntries = (obj) => {
        Object.entries(obj).forEach(element => {
            console.log(element)
        })
    }
    static getResponseType = async (path) => {
        const response = await fetch(path)
        const blob = await response.blob()
        console.log(blob.type);
        return blob.type;
    }
}

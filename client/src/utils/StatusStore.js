const fetchStatus = async (token) => {
    let data = await fetch('http://localhost:8081/friend-status',
        {
          method:"GET",
          headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`
          }
        }
      );
    
    let list = await data.json();
    return list;
}

class StatusStore{
    constructor(token){
        this.store = {}
    }

    async initialize(token) {
        try {
            const statusList = await fetchStatus(token);
            for (let status of statusList) {
                this.store[status.userId] = status.count;
            }
        } catch (error) {
            console.error("Failed to initialize status store:", error);
        }
    }

    setOnline(username){
        if(!(username in this.store))
            this.store[username]=0;
        this.store[username]+=1;
        console.log(this.store);
        
    }
    
    setOffline(username){        
        if(!(username in this.store))
            return;
        if((this.store[username]==0))
            return;
        this.store[username]-=1;
        console.log(this.store);
    }

    checkStatus(username){
        console.log(this.store);
        return username && (username in this.store) && (this.store[username]>0);
    }
}

export default StatusStore;
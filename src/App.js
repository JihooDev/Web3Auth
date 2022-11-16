import {Web3Auth} from '@web3auth/modal'
import { useEffect, useState } from 'react';
import { SafeEventEmitterProvider } from '@web3auth/base';
import './App.css';

function App() {
  const [provider,setProvider] = useState(null);
  const clientId =  "BL560D1jPTAlKCd5hqYZoQYaobQVY25NIBaEpFp6wwllhHf23K3oIcpoFsHI4hEwH8gaxjVoPl6tHUgJQ3PbBeI"

  const web3auth = new Web3Auth({
    clientId :clientId,
    chainConfig : {
      chainNamespace : "eip155",
      chainId : 5,
    }
  });
  useEffect(()=>{
    const init = async () => {
    try {
        if(web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    }
      
    init();
  },[])

  const initModal = async () => {
    await web3auth.initModal();
  }

  const connectModal = async () => {
    await web3auth.connect();
  }

  const getUserInfo = async () => {
    if (!web3auth) {
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  }

  const logout = async () => {
    if(!web3auth) {
      return;
    }
    await web3auth.logout();
    setProvider(null);
  }


  return (
    <div className="App">
      <button onClick={initModal}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <button onClick={connectModal}>연동</button>
     <button onClick={getUserInfo}>유저</button>
    </div>
  );
}

export default App;

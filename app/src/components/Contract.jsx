import routes from '../routes';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  selectContract,
  selectContractList,
  selectSelectedChapter,
  selectCurrentContractId,
  setSelectedChapter,
  setCurrentContractId,
  setContract,
  setContractList
} from '../slices/contractSlice';

const Contract = () => {
  const contractData = useSelector(selectContract);
  const contractList = useSelector(selectContractList);
  const contractId = useSelector(selectCurrentContractId);
  const selectedChapter = useSelector(selectSelectedChapter)
  const dispatch = useDispatch();

  const getContractData = async (id) => {
    const res = await axios.get(routes.contractPath(id));
    dispatch(setContract(res.data))
    return res.data;
  };
  const getContractList = async () => {
    const res = await axios.get(routes.contractsPath());
    dispatch(setContractList(res.data))
    return res.data;
  };

  useEffect(() => {
    if (contractId) {
      getContractData(contractId);
    } else {
      getContractList();
    }
  }, [contractId]);

  const selectChapter = (chapterTitle) => () => {
    if (chapterTitle == selectedChapter) {
      dispatch(setSelectedChapter(""))
    } else {
      dispatch(setSelectedChapter(chapterTitle))
    }
  }
  
  const renderContractList = () => {
    console.log(contractList)
    getContractData(contractId);
    return Object.values(contractList).map((contract) => 
    <div className="card" key={contract.doc_id}
        onClick={dispatch(setCurrentContractId(contract.doc_id))}
      >
        <div className="card-body">
          {contract.title}
          Договор №{contract.doc_id}
        </div>
      </div>
    )
  }

  const renderContract = () => {
    console.log()
    getContractList();

    return <>
      <h4 id="contractTitle">{contractData.title}</h4>
      {contractData.chapters.map((chapter) => <div className="contractChapter"
        onClick={selectChapter(chapter.title)}
        key={chapter.chapter_no}>
        <b>{chapter.title}</b>
        <div>
          {chapter.content}
        </div>
      </div>)}
    </>
  }
  return <div id="contract">
    <div id="contractHeader">
      <svg id="headerIcon" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"><path d="M10 25H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v4M8 8h8M8 12h6M8 16h4" stroke="#264B82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M22.192 17.87l6.218 4.195" stroke="#264B82" strokeWidth="1.8" strokeLinecap="round"></path><path transform="matrix(.8286 .55682 -.55512 .83016 20.782 12.732)" stroke="#264B82" strokeWidth="1.8" strokeLinejoin="round" d="M0 0h4.064v6.959H0z"></path><path d="M19.732 12.033l5.453 3.671m-9.303 2.097l5.453 3.67" stroke="#264B82" strokeWidth="1.8" strokeLinecap="round"></path><path d="M24 27v.9a.9.9 0 00.9-.9H24zm-10 0h-.9a.9.9 0 00.9.9V27zm2-2.1h6v-1.8h-6v1.8zm7.1 1.1v1h1.8v-1h-1.8zm.9.1H14v1.8h10v-1.8zm-9.1.9v-1h-1.8v1h1.8zm7.1-2.1a1.1 1.1 0 011.1 1.1h1.8a2.9 2.9 0 00-2.9-2.9v1.8zm-6-1.8a2.9 2.9 0 00-2.9 2.9h1.8a1.1 1.1 0 011.1-1.1v-1.8z" fill="#264B82"></path></svg>
      <h4>Дополнительное соглашение</h4>
    </div>
    <div id="contractTextBlock">
      {contractId ? renderContract() : renderContractList
      }
    </div>
  </div>
}

export default Contract;
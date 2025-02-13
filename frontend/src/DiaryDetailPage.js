import "./css/DiaryDetailPage.css";
import MypageNav from "./components/MypageNav";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const DiaryDetailPage = ({ diary_detail_post,userdata }) => {
  const { date } = useParams();

  const [data, setData] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(data.content);
  const localContentInput = useRef();

  const handleRemove = () => {
    
    if (window.confirm(`일기를 정말 삭제하시겠습니까?`)) {
      axios
        .delete(`https://bzeroo.herokuapp.com/https://bzero.tk/post/detail/retrieve/${data.id}`, {
          headers: {
            Authorization: "Token ".concat(localStorage.getItem("token")),
          },
        })
        // .then(window.location.replace("/calendar"));
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(data.content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`일기를 수정하시겠습니까?`)) {
      // axios.put;
      toggleIsEdit();
    }
  };

  useEffect(() => {
    if (diary_detail_post.length >= 1) {
      const targetDiary = diary_detail_post.find(
        (it) => (it.date.slice(0, 10) === date)&&(it.author===userdata[0]?.email)
      );
      
      
      if (targetDiary) {
        setData(targetDiary);
       
      }
   
      
    }
    
  }, [date, diary_detail_post]);
  if(!diary_detail_post) {
    return <div className="CleanStoreDetail">로딩중입니다...</div>;
}else{
  return (
    <div className="diary_detail">
      <MypageNav />
      <div className="diary_detail_main">
        <div className="diary_detail_head">
          <p className="diary_detail_title">제로웨이스트 일기</p>
        </div>
        <div className="diary_detail_body">
          <div className="diary_detail_post">
            {diary_detail_post
              .filter((x) => (x.date.slice(0, 10) === date)&&(x.author===userdata[0]?.id))
              .map((it) => (
                <div>
                  <div className="diary_detail_top">
                    <div className="diary_detail_date">
                      <p className="diary_detail_post_date">
                        {it.date.slice(0, 10)}
                      </p>
                    </div>
                    <div className="diary_detail_post_title">{it.title}</div>

                    <div className="diary_detail_post_detail">
                      <div className="diary_detail_post_edit">
                       
                      </div>
                    </div>
                  </div>
                  <div className="diary_detail_content_box">
                    <div className="diary_detail_content">
                      {isEdit ? (
                        <>
                          <textarea
                            ref={localContentInput}
                            value={localContent}
                            onChange={(e) => setLocalContent(e.target.value)}
                          />
                        </>
                      ) : (
                        <>
                        <div>
                            
                            {it.image === null ? <div></div> : <img
              
                           src={`https://bzero.tk/${it.image}`}
                            />}
                          </div>
                          <p>{it.content}</p>
                          
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default DiaryDetailPage;

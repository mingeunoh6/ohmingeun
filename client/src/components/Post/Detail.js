
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";




function Detail(props) {

  const user = useSelector((state) => state.user)


  let navigate = useNavigate();
  let params = useParams();


  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제")) {
      axios.post("/api/post/delete", params).then((response) => {
        if (response.data.success) {
          alert("삭제완료");
          navigate("/postList");
        }
      });
    }
  }



  return (
    <div>
      <h1>Detail</h1>

      <div>
        <h2>title:{props.postInfo.title}</h2>
        {/* /문제가 시작된 부분 */}
        <h3>writer:{props.postInfo.author.displayName}</h3>

        {props.postInfo.image ? (
          <img
            src={props.postInfo.image}
            alt="postedImage"
            style={{ width: "100%", height: "auto" }}
          />) : null}


        <p>content: {props.postInfo.content}</p>

        {user.uid === props.postInfo.author.uid && (

          <div>
            <Link to={`/edit/${props.postInfo.postNum}`}>
              <button>edit</button>
            </Link>

            <button onClick={DeleteHandler}>delete</button>
          </div>

        )}


      </div>

    </div>
  )

};



export default Detail;
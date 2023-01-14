import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import AdminService from "../../services/admin.service";
import LocationImg from "../../assets/Icons/location.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import ConfirmationModal from "../../helpers/confirmationModal";
import { useDispatch } from "react-redux";
import { setLoader, clearLoader } from "../../store/actions/loader";
import { useInterval } from "../../helpers/useInterval";
import { POLLING_INTERVAL } from "../../constants/variables";

const AllNews = (props) => {
  const dispatch = useDispatch();
  const [news, setNews] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedNews, setSelectedNews] = useState({});

  useInterval(async () => {
    dispatch(setLoader());
    //console.log("Checking for data updates");
    await AdminService.fetchNews().then((res) => {
      dispatch(clearLoader());
      setNews(res.data.newsBeans);
    });
  }, POLLING_INTERVAL);

  useEffect(() => {
    dispatch(setLoader());
    AdminService.fetchNews().then((res) => {
      dispatch(clearLoader());
      setNews(res.data.newsBeans);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='row'>
      {news.map((news, index) => {
        return (
          <div className='col-sm-6' key={index}>
            <div className='card p-0 m-2'>
              <h5 className='card-header'>{news.title}</h5>
              <div className='card-body'>
                <h5 className='card-title'>{parse(news.description)}</h5>
                <p>
                  {" "}
                  <span
                    className='rounded-pill p-2 text-sm'
                    style={{ color: "#E74E54", backgroundColor: "#FDD8D8" }}
                  >
                    {news.id}
                  </span>
                </p>
                <h5 className='text-muted'>
                  <img src={LocationImg} height='25' alt='' />
                  {news.location}
                </h5>
                <a
                  href={news.newsLink}
                  className='btn btn-primary'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  Go To News
                </a>
                <button
                  className='btn btn-danger ms-2'
                  onClick={(e) => {
                    setSelectedNews(news);
                    setModalShow(true);
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-trash'
                    viewBox='0 0 16 16'
                  >
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                    <path
                      fillRule='evenodd'
                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {modalShow && (
        <ConfirmationModal
          data={selectedNews}
          show={modalShow}
          type='news'
          onHide={() => setModalShow(false)}
        />
      )}
    </div>
  );
};

export default AllNews;

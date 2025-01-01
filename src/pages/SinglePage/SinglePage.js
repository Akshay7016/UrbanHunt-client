import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

import { Slider } from 'components/Slider/Slider';
import { Map } from 'components/Map/Map';
import { getDistance } from 'lib/getDistance';
import { useAuthContext } from 'context/AuthContext';
import { apiRequest } from 'lib/apiRequest';
import { Spinner } from 'components/Spinner/Spinner';

import './SinglePage.scss';

const utilitiesData = {
  owner: 'Owner is responsible',
  tenant: 'Tenant is responsible',
  shared: 'Shared',
};

export const SinglePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const postId = pathname.slice(1);
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState(false);

  const {
    images,
    title,
    address,
    price,
    bedroom,
    bathroom,
    city,
    user: { username = '', avatar = '' } = {},
    postDetail: {
      desc,
      utilities,
      pet,
      income,
      size,
      school,
      bus,
      restaurant,
    } = {},
  } = post;

  const handleSave = async () => {
    if (!currentUser) {
      return navigate('/login');
    }

    try {
      await apiRequest.post('/users/save', { postId });
      setSaved((prev) => !prev);
      toast.success(saved ? 'Place unsaved' : 'Place saved');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      return navigate('/login');
    }
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiRequest.get(`/posts/${postId}`);
        setPost(data);
        setSaved(data?.isSaved);
      } catch (error) {
        setError(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <h1 className="errorMessage">{error}</h1>;
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          {images.length > 0 && <Slider images={images} />}

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{title}</h1>
                <div className="address">
                  <img src="/images/pin.png" alt="pin-icon" />
                  <span>
                    {address}, {city}
                  </span>
                </div>
                <div className="price">Rs {price}</div>
              </div>
              <div className="user">
                <img src={avatar ?? '/images/avatar.jpg'} alt="user-image" />
                <p>{username}</p>
              </div>
            </div>
            <div className="bottom">
              <p
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}
              ></p>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="title">General</div>
          <div className="listVertical">
            <div className="feature">
              <img src="/images/utility.png" alt="utility" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{utilitiesData[utilities]}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/pet.png" alt="pet" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{pet === 'allowed' ? 'Allowed' : 'Not allowed'}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/fee.png" alt="fee" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{income}</p>
              </div>
            </div>
          </div>
          <div className="title">Sizes</div>
          <div className="sizes">
            <div className="size">
              <img src="/images/size.png" alt="size" />
              <span>{size} sqft</span>
            </div>

            <div className="size">
              <img src="/images/bed.png" alt="size" />
              <span>{bedroom} bedroom</span>
            </div>

            <div className="size">
              <img src="/images/bath.png" alt="size" />
              <span>{bathroom} bathroom</span>
            </div>
          </div>
          <div className="title">Nearby Places</div>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/images/school.png" alt="school" />
              <div className="featureText">
                <span>School</span>
                <p>{getDistance(school)}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/bus.png" alt="bus" />
              <div className="featureText">
                <span>Bus</span>
                <p>{getDistance(bus)}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/restaurant.png" alt="resto" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{getDistance(restaurant)}</p>
              </div>
            </div>
          </div>
          <div className="title">Location</div>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/images/chat.png" alt="chat" />
              <span>Send a Message</span>
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? '#fece51' : 'white',
              }}
            >
              <img src="/images/save.png" alt="save" />
              {saved ? 'Place saved' : 'Save the Place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useLoaderData } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { Slider } from 'components/Slider/Slider';
import { Map } from 'components/Map/Map';
import { getDistance } from 'lib/getDistance';

import './SinglePage.scss';

const utilitiesData = {
  owner: 'Owner is responsible',
  tenant: 'Tenant is responsible',
  shared: 'Shared',
};

export const SinglePage = () => {
  const post = useLoaderData();
  const {
    images,
    title,
    address,
    price,
    bedroom,
    bathroom,
    user: { username, avatar },
    postDetail: { desc, utilities, pet, income, size, school, bus, restaurant },
  } = post;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{title}</h1>
                <div className="address">
                  <img src="/images/pin.png" alt="pin-icon" />
                  <span>{address}</span>
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
            <button>
              <img src="/images/chat.png" alt="chat" />
              <span>Send a Message</span>
            </button>
            <button>
              <img src="/images/save.png" alt="save" />
              Save the Places
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

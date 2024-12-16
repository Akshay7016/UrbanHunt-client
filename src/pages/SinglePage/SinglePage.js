import { Slider } from 'components/Slider/Slider';
import { Map } from 'components/Map/Map';
import { singlePostData, userData } from 'lib/dummyData';

import './SinglePage.scss';

export const SinglePage = () => {
  const {
    title,
    images,
    address,
    price,
    description,
    size,
    bedRooms,
    bathroom,
    school,
    bus,
    restaurant,
  } = singlePostData;
  const { img, name } = userData;

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
                <div className="price">$ {price}</div>
              </div>
              <div className="user">
                <img src={img} alt="user-image" />
                <p>{name}</p>
              </div>
            </div>
            <div className="bottom">
              <p>{description}</p>
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
                <p>Renter is responsible</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/pet.png" alt="pet" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/fee.png" alt="fee" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
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
              <span>{bedRooms} bedroom</span>
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
                <p>{school}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/bus.png" alt="bus" />
              <div className="featureText">
                <span>Bus</span>
                <p>{bus}</p>
              </div>
            </div>

            <div className="feature">
              <img src="/images/restaurant.png" alt="resto" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{restaurant}</p>
              </div>
            </div>
          </div>
          <div className="title">Location</div>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
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

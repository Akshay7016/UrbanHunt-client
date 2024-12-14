import { SearchBar } from 'components/SearchBar/SearchBar';

import './HomePage.scss';

export const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Discover your ideal home or investment property with ease. Our
            platform offers detailed listings, high-quality images, and advanced
            search filters to help you find the perfect place effortlessly.
            Start your journey today and secure your dream property with just a
            few clicks.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imageContainer">
        <img src="/images/bg.png" alt="bg-img" />
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./styles.module.scss";

SwiperCore.use([Autoplay, Navigation, Pagination]);

function InstagramFeed() {
  const [instagramPosts, setInstagramPosts] = useState([]);
  console.log(instagramPosts);
  const host = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await axios.get(host + "/instagram-posts");
        setInstagramPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <Container className={styles["instagram-feed-container"]}>
      <Swiper
        className={styles["swiper-container"]}
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          600: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {instagramPosts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className={styles["image-container"]}>
              {post.media_type === "VIDEO" ? (
                <video src={post.media_url} controls alt="" />
              ) : (
                <img src={post.media_url} alt="" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={`swiper-pagination ${styles["swiper-pagination"]}`}></div>
      <div
        className={`swiper-button-prev ${styles["swiper-button-prev"]}`}
      ></div>
      <div
        className={`swiper-button-next ${styles["swiper-button-next"]}`}
      ></div>
    </Container>
  );
}

export default InstagramFeed;

import "../styles/reviews.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  swipeToSlide: true,
  autoplaySpeed: 2000,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const testimonials = [
  {
    text: "This diary app has become my personal sanctuary for thoughts...",
    name: "Anjali Sharma",
    location: "Kyoto, Japan",
    image:
      "https://app.tanyakhanijow.com/wp-content/uploads/2022/12/4F2A9861-6-1-1.jpg",
  },
  {
    text: "This app is a hidden gem! The design and features are exceptional...",
    name: "Ravi Mehta",
    location: "Vancouver, Canada",
    image:
      "https://www.solotravellersmeetup.com/wp-content/uploads/2017/10/1-696x464.jpg",
  },
  {
    text: "This diary app offers such peaceful and focused writing sessions...",
    name: "Sanjay Kumar",
    location: "Udhampur, Jammu & Kashmir",
    image:
      "https://ascentdescentadventures.com/wp-content/uploads/2023/09/Mukesh-Marwah-Owner-Pixelvj-on-Solo-Trek-jpg.webp",
  },
  {
    text: "The simplicity of this app is unparalleled and calming to use...",
    name: "Pooja Verma",
    location: "Lisbon, Portugal",
    image:
      "https://img.freepik.com/premium-photo/indian-girl-enjoying-rock-mountains-hill_437792-434.jpg",
  },
  {
    text: "This diary app is perfect for weekend reflections and thoughts...",
    name: "Nikhli Verma",
    location: "Reykjavík, Iceland",
    image:
      "https://inspireuadventures.com/wp-content/uploads/2018/02/trekking-nepal-por-libre-1.jpg",
  },
];

function Reviews() {
  return (
    <div className="reviews">
      <h2 className="reviews-header">What People Think About Us</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <div className="testimonial-user">
              <img
                src={testimonial.image}
                alt="Customer"
                className="testimonial-img"
              />
              <div className="testimonial-info">
                <h6>{testimonial.name}</h6>
                <p>{testimonial.location}</p>
              </div>
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
          </div>
        ))} 
      </Slider>
    </div>
  );
}

export default Reviews;

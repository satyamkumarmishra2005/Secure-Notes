import React from "react";
import TestimonialItem from "./TestimonialItem";

const Testimonial = () => {
  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-x-4 gap-y-10 md:px-0 px-5">
      <TestimonialItem
        title="Natives Api"
        text=" It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English."
        name="Easin"
        status="Creator"
      />
      <TestimonialItem
        title="Natives Api"
        text=" It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English."
        name="Easin"
        status="Creator"
      />
      <TestimonialItem
        title="Natives Api"
        text=" It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English."
        name="Easin"
        status="Creator"
      />
    </div>
  );
};

export default Testimonial;

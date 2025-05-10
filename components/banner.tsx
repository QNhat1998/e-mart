import React from 'react';
import Title from './title';

const Banner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Title className="uppercase text-3xl md:text-4xl font-bold text-center">
        Bộ sưu tập quần áo tốt nhất
      </Title>
      <p className="text-sm text-center text-lightColor/80 font-medium max-w-[480px] ">
        Tìm kiếm tất cả những gì bạn cần để trông và cảm thấy tốt nhất, và mua sắm những sản phẩm thời thượng và phong cách cho nam giới.
      </p>
    </div>
  );
};

export default Banner;

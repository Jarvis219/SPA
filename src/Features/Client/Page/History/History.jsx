import BannerProcess from 'Features/Client/Components/Header/Banner/BannerProcess';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { treatmentSTT } from 'Features/type/enumStatus';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getId, notifyErrorLogin } from 'Utils/Utils';
import MainHistory from './MainHistory';

const History = () => {
  const history = useHistory();
  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để xem lịch sử!');
      history.push('/');
    }
  }, [history]);

  const appointments = useSelector((state) => state.appointment.current);
  console.log('appointments: ', appointments);

  const successAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[0])
  ); // đặt thành công
  const processingAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[1])
  ); // đang thực hiện
  const doneAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[2])
  ); //Đã xong
  const cancelAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[3])
  ); // Đã uỷ
  const failedAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[4])
  ); // Đặt thất bại

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProcess />
      </header>
      {appointments && appointments.length > 0 ? (
        <main className="container mx-auto font-nunito">
          <div className="relative">
            <img className="mx-auto" src="images/banner/service/icon-leaf-small.png" alt="" />
            <div className="item-center absolute inset-0 top-5 my-auto flex justify-center">
              <div className="text-center">
                <span className="block text-[48px] font-bold">Lịch sử đặt lịch</span>
                <span className="block font-semibold text-[#945050]">
                  Vì chất lượng ngày càng hoàn thiện - trải nghiệm mua hàng cùng Hillsbeauty Spa
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto grid lg:w-[1300px]">
            <section className="">
              <ul
                className="nav nav-justified nav-tabs my-4 grid list-none grid-cols-2 border-b-0 px-5 md:grid-cols-5"
                id="tabs-tabJustify"
                role="tablist">
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-appointments-all"
                    className=" active nav-link my-2 block w-full border-x-0 border-t-0 
                    border-b-2 border-transparent px-6 py-3 text-sm font-medium uppercase
                    leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent "
                    id="tabs-product-all"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-appointments-all"
                    role="tab"
                    aria-controls="tabs-view-appointments-all"
                    aria-selected="true">
                    Tất cả lịch hẹn ({appointments.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-appointments-success"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-profile-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-appointments-success"
                    role="tab"
                    aria-controls="tabs-view-appointments-success"
                    aria-selected="false">
                    Lịch hẹn thành công ({successAppointments.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-appointments-processing"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-profile-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-appointments-processing"
                    role="tab"
                    aria-controls="tabs-view-appointments-processing"
                    aria-selected="false">
                    Dịch vụ đang sử dụng ({processingAppointments.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-appointments-done"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-profile-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-appointments-done"
                    role="tab"
                    aria-controls="tabs-view-appointments-done"
                    aria-selected="false">
                    Dịch vụ đã sử dụng ({doneAppointments.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-appointments-cancel"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-profile-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-appointments-cancel"
                    role="tab"
                    aria-controls="tabs-view-appointments-cancel"
                    aria-selected="false">
                    Dịch vụ đã hủy ({cancelAppointments.length})
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentJustify">
                <div
                  className="active show tab-pane fade"
                  id="tabs-view-appointments-all"
                  role="tabpanel"
                  aria-labelledby="tabs-product-all">
                  <MainHistory appointments={appointments} />
                </div>

                <div
                  className="fade tab-pane"
                  id="tabs-view-appointments-success"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify">
                  <MainHistory appointments={successAppointments} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-appointments-processing"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify">
                  <MainHistory appointments={processingAppointments} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-appointments-done"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify">
                  <MainHistory appointments={doneAppointments} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-appointments-cancel"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify">
                  <MainHistory appointments={cancelAppointments} />
                </div>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <div className="my-24 text-center text-2xl md:text-4xl">
          Chưa có lịch hẹn nào <i className="far fa-sad-tear"></i>
        </div>
      )}
    </Fragment>
  );
};

export default History;

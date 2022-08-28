import BannerProcess from 'Features/Client/Components/Header/Banner/BannerProcess';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { treatmentSTT } from 'Features/type/enumStatus';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { findCustomer } from 'Services/customer';
import { listAppointmentTreatmentByCustomer } from 'Services/appointmentTreatment';
import { getId, getPhoneNumber, notifyErrorLogin } from 'Utils/Utils';
import HistoryTreatmentDetail from './HistoryTreatmentDetail';

const HistoryTreatment = () => {
  const history = useHistory();
  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để xem lịch sử!');
      history.push('/');
    }
  }, [history]);

  const user = useSelector((state) => state.auth.current);
  const [userPhone, setUserPhone] = useState();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      let phoneNumberUser = user.phoneNumber;
      phoneNumberUser = phoneNumberUser?.replace('+84', '0');
      setUserPhone(phoneNumberUser);
    } else if (getPhoneNumber() !== null) {
      let phoneNumberUser = getPhoneNumber();
      phoneNumberUser = phoneNumberUser?.replace('+84', '0');
      setUserPhone(phoneNumberUser);
    } else {
      setUserPhone(undefined);
    }
  }, [user]);

  const [listAppointmentTreatment, setListAppointmentTreatment] = useState([]);
  useEffect(() => {
    const getListAppointmentTreatment = async () => {
      console.log('userPhone: ', userPhone);
      const { data } = await findCustomer(userPhone);

      const customer_id = data.data[0]._id;
      const { data: listAppTreatment } = await listAppointmentTreatmentByCustomer(customer_id);
      setListAppointmentTreatment(listAppTreatment);
    };
    if (userPhone) {
      getListAppointmentTreatment();
    }
  }, [userPhone]);

  const showStatus = (status) => {
    if (status === 0) {
      return <span className="rounded-md bg-blue-500 px-2 text-white">{treatmentSTT[status]}</span>;
    } else if (status === 1) {
      return (
        <span className="rounded-md bg-orange-500 px-2 text-white">{treatmentSTT[status]}</span>
      );
    } else if (status === 2) {
      return (
        <span className="rounded-md bg-green-500 px-2 text-white">{treatmentSTT[status]}</span>
      );
    } else if (status === 3) {
      return <span className="rounded-md bg-red-500 px-2 text-white">{treatmentSTT[status]}</span>;
    } else {
      return <span className="rounded-md bg-red-500 px-2 text-white">{treatmentSTT[4]}</span>;
    }
  };

  let [isOpen, setIsOpen] = useState(false);
  const [detailTreatment, setDetailTreatment] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleShowModal = (data) => {
    setDetailTreatment(data);
    setIsOpen(true);
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProcess />
      </header>
      {listAppointmentTreatment && listAppointmentTreatment.length > 0 ? (
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
                className="nav nav-justified nav-tabs my-4 grid list-none border-b-0 px-5 "
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
                    Tất cả liệu trình ({listAppointmentTreatment.length})
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentJustify">
                <div
                  className="active show tab-pane fade"
                  id="tabs-view-appointments-all"
                  role="tabpanel"
                  aria-labelledby="tabs-product-all">
                  <div className="border-b ">
                    <article className="flex items-start space-x-6 p-3">
                      <div className="relative min-w-0 flex-auto">
                        {/* <div className="flex items-center justify-between">
                        <h2 className="truncate pr-20 text-[20px] font-semibold text-slate-900">
                          {appointment?.treatment_id.treatment_name}
                        </h2>
                        <div className="">{statusAppointment(appointment.status_notification)}</div>
                      </div> */}
                        <dl className="text-sm font-medium leading-6">
                          <table className="hidden pt-3 md:block">
                            <thead>
                              <tr className="border-b">
                                <th className="w-40">#</th>
                                <th className="w-40">Họ tên</th>
                                <th className="w-40">Số điện thoại</th>
                                <th className="w-40">Liệu trình</th>
                                <th className="w-40">Ảnh</th>
                                <th className="w-40">Tổng tiền</th>
                                <th className="w-40">Tiến trình</th>
                                <th className="w-40">Trạng thái</th>
                              </tr>
                            </thead>
                            <tbody>
                              {listAppointmentTreatment &&
                                listAppointmentTreatment.map((appointment, index) => {
                                  return (
                                    <tr key={index} className="border-b text-center">
                                      <td>{index + 1}</td>
                                      <td>{appointment?.customer_id.customer_name}</td>
                                      <td>{appointment?.customer_id.customer_phone}</td>
                                      <td>{appointment?.treatment_id.treatment_name}</td>
                                      <td>
                                        <img
                                          class="my-5 h-24 w-32"
                                          src={appointment?.treatment_id.album[0]}
                                        />
                                      </td>
                                      <td>{appointment?.treatment_id.treatment_price}</td>
                                      <td>{appointment?.progress}</td>
                                      <td>
                                        <div className="flex items-center justify-center">
                                          {showStatus(appointment?.status)}
                                          {/* <span
                                            onClick={() => handleShowModal(appointment)}
                                            className="cursor-pointer rounded-md bg-gray-200 px-3 py-1">
                                            <i class="fas fa-eye  text-blue-500"></i>
                                          </span> */}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </dl>
                      </div>
                    </article>
                  </div>
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
      <HistoryTreatmentDetail
        appointments={detailTreatment}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
    </Fragment>
  );
};

export default HistoryTreatment;

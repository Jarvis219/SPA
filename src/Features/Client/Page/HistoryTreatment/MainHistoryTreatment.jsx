import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import { changeDisplayPrices } from 'Utils/Utils';
import RatingService from './RatingService';

const MainHistoryTreatment = (props) => {
  const { listAppointmentTreatment } = props;
  console.log("listAppointmentTreatment: ", listAppointmentTreatment);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOrder, setServiceOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const serviceStore = useSelector((state) => state.service.current);
  const dispatch = useDispatch();
  const history = useHistory();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleShowModalEvaluate = (products) => {
    // setServiceOrder(products);
    setIsOpen(true);
  };

  //hiển thị trạng thái lịch hẹn
  const statusAppointment = (status) => {
    if (status === 0) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-calendar-check"></i> <span>Đặt lịch thành công </span>
        </p>
      );
    } else if (status === 1) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-seedling"></i> <span>Đang điều trị </span>
        </p>
      );
    } else if (status === 2) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-hand-holding-heart"></i> <span>Đã điều trị xong </span>
        </p>
      );
    } else if (status === 3) {
      return (
        <p className="space-x-2 text-[red]">
          <i className="fas fa-window-close"></i> <span>Lịch hẹn đã hủy </span>
        </p>
      );
    } else {
      return (
        <p className="space-x-2 text-[red]">
          <i className="far fa-frown"></i> <span>Đặt lịch hẹn thất bại </span>
        </p>
      );
    }
  };

  const noAppointment = () => {
    return (
      <div className="my-10 text-center">
        <h3 className="mb-6 text-center text-3xl">
          Bạn chưa sử dụng dịch vụ nào. Hãy thử trải nghiệm ngay!
        </h3>
        <Link
          to="/service"
          className="mr-6 rounded-lg bg-blue-500 px-4 py-3  text-center font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600">
          Dịch vụ
        </Link>
      </div>
    );
  };

  return (
    <>
      {listAppointmentTreatment.length < 1 ? (
        noAppointment()
      ) : (
        <div>
          {listAppointmentTreatment &&
            listAppointmentTreatment.map((appointment) => {
              // let serviceDetail = serviceStore.filter(
              //   (service) => service._id === appointment.service_id._id
              // );
              // serviceDetail = serviceDetail[0];
              return (
                <div key={appointment._id} className="border-b ">
                  <article className="flex items-start space-x-6 p-3">
                    {/* <img
                      src={appointment.service_id.service_album[1]}
                      alt=""
                      width="140"
                      className="h-full flex-none rounded-md bg-slate-100"
                    /> */}
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
                            <tr>
                              <th className="w-40">#</th>
                              <th className="w-40">Họ tên</th>
                              <th className="w-40">Số điện thoại</th>
                              <th className="w-40">Liệu trình</th>
                              <th className="w-40">Tổng tiền</th>
                              <th className="w-40">Tiến trình</th>
                            </tr>
                          </thead>
                          {/* <tbody>
                            <tr className="text-center">
                              <td>{serviceDetail.category_id.category_name}</td>
                              <td>{serviceDetail.service_time} phút</td>
                              <td>07-04-2022</td>
                              <td>{appointment.appointment_date.split(' - ')[0].split('T')[0]}</td>
                              <td>
                                {appointment.appointment_date.split(' - ')[0].split('T')[1]} -{' '}
                                {appointment.appointment_date.split(' - ')[1].split('T')[1]}
                              </td>
                            </tr>
                          </tbody> */}
                        </table>
                        {/* <div className="block md:hidden">
                          <div className="flex items-center justify-between">
                            <p>Danh mục: {serviceDetail.category_id.category_name}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>Thời gian thực hiện dịch vụ : {serviceDetail.service_time} phút</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>Ngày đặt lịch : 07-04-2022</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>
                              Ngày hẹn: {appointment.appointment_date.split(' - ')[0].split('T')[0]}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p>
                              Giờ hẹn: {appointment.appointment_date.split(' - ')[0].split('T')[1]}{' '}
                              - {appointment.appointment_date.split(' - ')[1].split('T')[1]}
                            </p>
                          </div>
                        </div> */}
                      </dl>
                    </div>
                  </article>

                  {/* <div className="my-2 flex items-center justify-end space-x-2 text-2xl text-[#1f1f1f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-report-money"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                      <rect x={9} y={3} width={6} height={4} rx={2}></rect>
                      <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                      <path d="M12 17v1m0 -8v1"></path>
                    </svg>
                    <span>Tổng số tiền: </span>{' '}
                    <span className="text-[#ee4d48]">
                      {changeDisplayPrices(appointment.service_id.service_price)}
                    </span>
                  </div> */}
                </div>
              );
            })}
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default MainHistoryTreatment;

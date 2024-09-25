/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Alert,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";
import axiosClient from "../../axiosClientOffline";

export default function Captien() {
  const [admins, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchArchive();
  }, []);

  const fetchArchive = async () => {
    try {
      const response = await axiosClient.post(`get-all-user-admin-data`);
      setAdmin(response.data.users);
      console.log(response.data);
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      }else if (err.message == "Request failed with status code 500") {
        setErrorMessage(`لا استطيع الوصول للسيرفر`);
      } else {
        setErrorMessage(`Error fetching admin : ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
  const Loader = (props) => {
    const random = Math.random() * (1 - 0.7) + 0.7;
    return (
      <ContentLoader
        height={50}
        width={1060}
        speed={2}
        primarycolor="#333"
        secondarycolor="#999"
        {...props}
      >
        <rect x="10" y="13" rx="6" ry="6" width={120 * random} height="12" />
        <rect x="159" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="250" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="360" y="13" rx="6" ry="6" width={40 * random} height="12" />
        <rect x="430" y="13" rx="6" ry="6" width={60 * random} height="12" />
        <rect x="530" y="13" rx="6" ry="6" width={100 * random} height="12" />
        <rect x="650" y="13" rx="6" ry="6" width={100 * random} height="12" />
  
        <rect x="0" y="39" rx="6" ry="6" width="1090" height=".3" />
      </ContentLoader>
    );
  };
  return (
    <>
        {successMessage && (
          <Alert
            variant="success"
            onClose={() => setSuccessMessage("")}
            style={{ width: "max-content" }}
            dismissible
          >
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert
            variant="danger"
            onClose={() => setErrorMessage("")}
            style={{ width: "max-content" }}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}

        {loading ? (
          <>
          {Array(10)
            .fill("")
            .map((e, i) => (
              <Loader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
            ))}
        </>
        ) : (
          <>
          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">جميع توصياته</th>
                  <th scope="col">التوصيات المنتهية</th>
                  <th scope="col">المحقق الهدف الأول</th>
                  <th scope="col">المحقق الهدف الثاني</th>
                  <th scope="col">التوصيات الناجحه</th>
                  <th scope="col">خرج ايقاف خسارة</th>
                  <th scope="col">عدد المشاركين معه</th>
                  <th scope="col">الارباح</th>
                  <th scope="col">ارباح المشاركين</th>
                  <th scope="col">خسائر المشاركين</th>
                </tr>
              </thead>
              <tbody>
                {admins ?admins.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.recommendation}</td>
                    <td>{user.activeRecommendation}</td>
                    <td>{user.reachFirstTarget}</td>
                    <td>{user.reachSecondTarget}</td> 
                    <td>{user.reachFirstTarget + user.reachSecondTarget}</td>
                    <td>{user.loseTarget}</td>
                    <td>{user.SubscribedPersonsCount}</td>
                    <td>{user.fees}</td>
                    <td className="text-success"style={{direction:'ltr'}}>{user.profitWin}</td>
                    <td className="text-danger" style={{direction:'ltr'}}>{user.profitLose}</td>
                  </tr>
                ))
                :null
              }
              </tbody>
            </table>
          </div>
          </>
        )}
     
    </>
  );
}

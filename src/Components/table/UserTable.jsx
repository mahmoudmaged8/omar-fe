/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
// import xlsx from 'node-xlsx';
import * as XLSX from 'xlsx';

// import axiosClient from "../../axiosClientForaFront";
import {
  Alert,
} from "react-bootstrap";
import ContentLoader from "react-content-loader";

import axiosClientBuffer from "../../axiosClientOfflineBuffer";
// import axiosClientOff from "../../axios_offline";

export default function UserTable() {
  const [admins, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchArchive();
  }, []);

// Function to convert array to worksheet
const arrayToSheet = (data, opts) => {
  const ws = XLSX.utils.json_to_sheet(data, opts);
  return ws;
};

// Function to download the data as Excel file
const downloadExcel = (data, fileName = 'AdminsData.xlsx') => {
  const ws = arrayToSheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Admins');
  XLSX.writeFile(wb, fileName);
};
  const fetchArchive = async () => {
    try {
      const response = await axiosClientBuffer.post(`t`);
      console.log(response.data.data);
      setAdmin(response.data.data);
      if (window.location.search.includes("update")) {
        setSuccessMessage("User updated successfully");
        window.history.replaceState(null, "", window.location.pathname);
      } else if (window.location.search.includes("added")) {
        setSuccessMessage("User added successfully");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err) {
      if (err.message == "Network Error") {
        setErrorMessage(`الانترنت لا يعمل`);
      } else if (err.message == "Request failed with status code 500") {
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
        <button onClick={() => downloadExcel(admins.filter(user => user.active === 0), 'AdminsList.xlsx')}>Export to Excel</button>
          <div className="table-responsive min-h-[100vh]">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">الاسم</th>
                  <th scope="col">الإيميل</th>
                  <th scope="col">رقم الهاتف</th>
                  <th scope="col">الأموال في المحفظة</th>
                </tr>
              </thead>
              <tbody>
                {admins
                  ? admins.filter(user => user.active === 1).map((user, index) => (
                      <tr key={user.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td style={{ textAlign: "center" }}>
                          {user.phone ? user.phone : "-"}
                        </td>
                        <td>{user.money ? user.money : 0}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}


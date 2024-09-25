/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   const totalPages = Math.ceil(totalUsers / usersPerPage);
//   const items = [];

//   for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
//     items.push(
//       <Pagination.Item
//         key={pageNumber}
//         active={pageNumber == currentPage}
//         onClick={() => onPageChange(pageNumber)}
//       >
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   return (
//       <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">{items}</Pagination>
//   );
// }

// export default CustomPagination;
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   const totalPages = Math.ceil(totalUsers / usersPerPage);
  
//   const paginationItems = [];
//   let startPage, endPage;

//   if (totalPages <= 5) {
//     // أقل من 5 صفحات إجمالية
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     // أكثر من 5 صفحات
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   // سهم للصفحة الأولى
//   if (currentPage > 1) {
//     paginationItems.push(
//       <Pagination.First key="first" onClick={() => onPageChange(1)} />
//     );
//   }

//   // إنشاء العناصر
//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item
//         key={pageNumber}
//         active={pageNumber === currentPage}
//         onClick={() => onPageChange(pageNumber)}
//       >
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   // نقاط إذا كان هناك صفحات لم تعرض
//   if (endPage < totalPages) {
//     paginationItems.push(<Pagination.Ellipsis key="ellipsis" />);
//     paginationItems.push(
//       <Pagination.Item
//         key={totalPages}
//         active={totalPages === currentPage}
//         onClick={() => onPageChange(totalPages)}
//       >
//         {totalPages}
//       </Pagination.Item>
//     );
//   }

//   // سهم للصفحة الأخيرة
//   if (currentPage < totalPages) {
//     paginationItems.push(
//       <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
//     );
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   const totalPages = Math.ceil(totalUsers / usersPerPage);
//   const paginationItems = [];

//   let startPage, endPage;

//   if (totalPages <= 5) {
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   if (currentPage > 1) {
//     paginationItems.push(
//       <Pagination.First key="first" onClick={() => onPageChange(1)} />
//     );
//   }

//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item
//         key={pageNumber}
//         active={pageNumber === currentPage}
//         onClick={() => onPageChange(pageNumber)}
//       >
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(
//       <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
//     );
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   const totalPages = Math.ceil(totalUsers / usersPerPage);
//   const paginationItems = [];

//   let startPage, endPage;

//   if (totalPages <= 5) {
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   if (currentPage > 1) {
//     paginationItems.push(
//       <Pagination.First key="first" onClick={() => onPageChange(1)} />
//     );
//   }

//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item
//         key={pageNumber}
//         active={pageNumber === currentPage}
//         onClick={() => onPageChange(pageNumber)}
//       >
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(
//       <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
//     );
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange ,lastPage }) {
//   // حساب عدد الصفحات بحيث لا تكون الصفحة الأخيرة فارغة أو بها أقل من 20 مستخدم
//   const totalPages = totalUsers <= 19 ? 1 : Math.ceil((totalUsers - 19) / usersPerPage) + 1;
//   const paginationItems = [];

//   let startPage, endPage;

//   if (totalPages <= 5) {
//     startPage = 1;
//     endPage = totalPages;
//   } 
//   else {
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   if (currentPage > 1) {
//     paginationItems.push(
//       <Pagination.First key="first" onClick={() => onPageChange(1)} />
//     );
//   }

//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item
//         key={pageNumber}
//         active={pageNumber === currentPage}
//         onClick={() => onPageChange(pageNumber)}
//       >
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(
//       <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
//     );
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;
import Pagination from "react-bootstrap/Pagination";

function CustomPagination({ currentPage, onPageChange, lastPage }) {
  // حساب عدد الصفحات بحيث لا تكون الصفحة الأخيرة فارغة أو بها أقل من 20 مستخدم
  // const allTotalPages = totalUsers <= 19 ? 1 : Math.ceil((totalUsers - 19) / usersPerPage) + 1;
  const totalPages = lastPage;
  const paginationItems = [];

  let startPage, endPage;

  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  if (currentPage > 1) {
    paginationItems.push(
      <Pagination.First key="first" onClick={() => onPageChange(1)} />
    );
  }

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
    if (pageNumber !== currentPage || currentPage <= lastPage) { // Add this condition
      paginationItems.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }
  }

  if (currentPage < totalPages) {
    paginationItems.push(
      <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
    );
  }

  return (
    <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap" count={totalPages} shape="rounded" activepage={currentPage}>
      {paginationItems}
    </Pagination>
  );
}

export default CustomPagination;
// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   const totalPages = totalUsers <= 19 ? 1 : Math.ceil((totalUsers - 19) / usersPerPage) + 1;
//   const paginationItems = [];

//   let startPage, endPage;

//   if (totalPages <= 5) {
//     // إذا كان العدد الإجمالي للصفحات أقل من أو يساوي 5
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     // إذا كان العدد الإجمالي للصفحات أكثر من 5
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   if (currentPage > 1) {
//     paginationItems.push(<Pagination.First key="first" onClick={() => onPageChange(1)} />);
//   }

//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item 
//         key={pageNumber} 
//         active={pageNumber === currentPage} 
//         onClick={() => onPageChange(pageNumber)}>
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(<Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />);
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;

// import Pagination from "react-bootstrap/Pagination";

// function CustomPagination({ currentPage, totalUsers, usersPerPage, onPageChange }) {
//   // حساب عدد الصفحات، مع التحقق من عدد المستخدمين في الصفحة الأخيرة
//   let totalPages = Math.ceil(totalUsers / usersPerPage);
//   const lastPageUsers = totalUsers % usersPerPage;
//   if (lastPageUsers > 0 && lastPageUsers < 19) {
//     // إذا كانت الصفحة الأخيرة تحتوي على أقل من 19 مستخدمًا، استخدم الصفحة التي قبلها كصفحة أخيرة
//     totalPages -= 1;
//   }

//   const paginationItems = [];
//   let startPage, endPage;

//   if (totalPages <= 5) {
//     startPage = 1;
//     endPage = totalPages;
//   } else {
//     if (currentPage <= 3) {
//       startPage = 1;
//       endPage = 5;
//     } else if (currentPage + 2 >= totalPages) {
//       startPage = totalPages - 4;
//       endPage = totalPages;
//     } else {
//       startPage = currentPage - 2;
//       endPage = currentPage + 2;
//     }
//   }

//   if (currentPage > 1) {
//     paginationItems.push(<Pagination.First key="first" onClick={() => onPageChange(1)} />);
//   }

//   for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
//     paginationItems.push(
//       <Pagination.Item 
//         key={pageNumber} 
//         active={pageNumber === currentPage} 
//         onClick={() => onPageChange(pageNumber)}>
//         {pageNumber}
//       </Pagination.Item>
//     );
//   }

//   // ضمان إظهار الصفحة الأخيرة دائمًا
//   if (endPage < totalPages) {
//     // إضافة (...) إذا كانت هناك فجوة بين الصفحة الأخيرة والصفحات المعروضة
//     if (endPage < totalPages - 1) {
//       paginationItems.push(
//         <Pagination.Ellipsis key="ellipsis" disabled />
//       );
//     }
//     paginationItems.push(
//       <Pagination.Item 
//         key={totalPages} 
//         active={totalPages === currentPage} 
//         onClick={() => onPageChange(totalPages)}>
//         {totalPages}
//       </Pagination.Item>
//     );
//   }

//   if (currentPage < totalPages) {
//     paginationItems.push(<Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />);
//   }

//   return (
//     <Pagination className="d-flex justify-content-center mt-4 px-1 flex-wrap">
//       {paginationItems}
//     </Pagination>
//   );
// }

// export default CustomPagination;

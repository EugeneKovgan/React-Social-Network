import styles from "./Users.module.css";

const Paginator = ({
                     totalUsersCount,
                     pageSize,
                     currentPage,
                     onPageChanged,
                   }) => {
  const usersCount = totalUsersCount;
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
  for (let i = Math.max(currentPage - 5, 1); i <= Math.max(1, Math.min(currentPage + 5, pagesCount)); i++) {
    pages.push(i);
  }

  return (
    <div className={styles.paginator}>
      <div className={styles.total}>
        Total users count: <p>{usersCount}</p>
      </div>

      <div className={styles.pagesCounterBlock}>
        page:
        {pages.map((item) => {
          return (
            <p
              className={currentPage === item ? styles.selectedPage : styles.page}
              key={item}
              onClick={(e) => onPageChanged(item)}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Paginator;

// @ts-ignore
import styles from './Users.module.css';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  portionSize?: number;
};

const Paginator: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  portionSize = 10, //??
}) => {
  const usersCount = totalUsersCount;
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages: Array<number> = [];
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

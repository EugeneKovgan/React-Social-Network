import styles from './Users.module.css';
import Paginator from './Paginator';
import User from './User';

import {
  FilterType,
  requestUsers,
  actions,
  follow as follow_reducer,
  unfollow as unfollow_reducer,
} from '../redux/users-reducer';
import { UsersSearchForm } from './UsersSearchForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../redux/users-selectors';
import { AppDispatch } from '../redux/redux-store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

let setCurrentPage = actions.setCurrentPage;

export const Users: React.FC = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate({
      pathname: './users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  useEffect(() => {
    const parsed = queryString.parse(location.search.substring(1));

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.frind) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  const onPageChanged = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  const follow = (userId: number) => {
    dispatch(follow_reducer(userId));
  };

  const unfollow = (userId: number) => {
    dispatch(unfollow_reducer(userId));
  };

  return (
    <div className={styles.usersMainBlock}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />

      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        // @ts-ignore
        followingInProgress={followingInProgress}
        follow={follow}
        unfollow={unfollow}
      />

      <div className={styles.users_list}>
        {users.map((item) => (
          <User
            key={item.id}
            item={item}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        ))}
      </div>
    </div>
  );
};

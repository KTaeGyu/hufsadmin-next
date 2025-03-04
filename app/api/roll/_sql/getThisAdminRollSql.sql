SELECT * FROM (
  SELECT A.ADMIN_ID, A.ADMIN_NAME, A.ROLL_ID, B.ROLL_NAME, ' '
  FROM HUFS_ADMIN_USER A, HUFS_ADMIN_ROLL B
  WHERE A.ROLL_ID = B.ROLL_ID 
    AND EXPIRATION_DATE >= TO_CHAR(SYSDATE,'YYYY-MM-DD') 
    AND A.ADMIN_ID = :admin_id

  UNION ALL                                      

  SELECT R.USER_ID, R.USER_NAME, R.PARENT_ID, B.ROLL_NAME , R.USER_ROLE   
  FROM HUFSCENTER_ROLE_INFO R, HUFS_ADMIN_ROLL B             
  WHERE R.PARENT_ID = B.ROLL_ID 
  AND   R.USE_YN = 'Y' 
  AND   R.USER_ID = :admin_id 
)
ORDER BY ROLL_NAME
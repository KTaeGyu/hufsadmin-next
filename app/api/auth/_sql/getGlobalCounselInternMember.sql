SELECT USER_NAME, USER_ID
FROM HUFSCENTER_ROLE_INFO
WHERE 1=1
AND   USE_YN        = 'Y'
AND   CAMPUS        = 'G'
AND   USER_ID       = :id
AND   USER_PASSWORD = :password

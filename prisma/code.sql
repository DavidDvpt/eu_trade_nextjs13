SELECT r.id, r.name,
    (SELECT SUM(quantity) FROM Transaction t1
    WHERE t1.resourceId = r.id AND type = 'BUY') buy,
    (SELECT SUM(quantity) FROM Transaction t2
    WHERE t2.resourceId = r.id AND type = 'SELL' AND t2.sellStatus = 'ENDED') sold,
    (SELECT SUM(quantity) FROM Transaction t3
    WHERE t3.resourceId = r.id AND type = 'SELL' AND t3.sellStatus = 'PROGRESS') progress,
    (SELECT SUM(quantity) FROM Transaction t4
    WHERE t4.resourceId = r.id AND type = 'SELL' AND t4.sellStatus = 'RETURNED') returned,
    (buy - sold - progress) stock
FROM Resource r
INNER JOIN Transaction t
ON r.id = r.id
GROUP BY r.id;

SELECT r.id, r.name, 
    (SELECT SUM(quantity) FROM Transaction t1
        WHERE t1.resourceId = r.id AND type = 'BUY') buy,
    (SELECT COUNT(*) FROM Transaction t1
        WHERE t1.resourceId = r.id AND type = 'BUY') buyCount,
    (SELECT SUM(quantity) FROM Transaction t2
        WHERE t2.resourceId = r.id AND type = 'SELL' AND t2.sellStatus = 'ENDED') sold,
    (SELECT COUNT(*) FROM Transaction t2
        WHERE t2.resourceId = r.id AND type = 'SELL' AND t2.sellStatus = 'ENDED') soldCount,
    (SELECT SUM(quantity) FROM Transaction t3
        WHERE t3.resourceId = r.id AND type = 'SELL' AND t3.sellStatus = 'PROGRESS') progress,
    (SELECT COUNT(*) FROM Transaction t3
        WHERE t3.resourceId = r.id AND type = 'SELL' AND t3.sellStatus = 'PROGRESS') progressCount,
    (SELECT SUM(quantity) FROM Transaction t4
        WHERE t4.resourceId = r.id AND type = 'SELL' AND t4.sellStatus = 'RETURNED') returned,
    (SELECT COUNT(*) FROM Transaction t4
        WHERE t4.resourceId = r.id AND type = 'SELL' AND t4.sellStatus = 'RETURNED') returnedCount,
    (SELECT 
        (SELECT SUM(quantity) FROM Transaction tb
            WHERE tb.resourceId = r.id AND type = 'BUY') - 
        IFNULL((SELECT SUM(quantity) FROM Transaction ts
            WHERE ts.resourceId = r.id AND type = 'SELL' AND ts.sellStatus = 'ENDED'),0) -
        IFNULL((SELECT SUM(quantity) FROM Transaction tp
            WHERE tp.resourceId = r.id AND type = 'SELL' AND tp.sellStatus = 'PROGRESS')
    ,0)) stock
FROM Resource r
INNER JOIN Transaction t
ON r.id = t.resourceId
GROUP BY r.id;

SELECT r.id, r.name, t.type, t.sellStatus, SUM(quantity), COUNT(*)
FROM Resource r
INNER JOIN Transaction t
ON r.id = t.resourceId
GROUP BY r.id, t.type, t.sellStatus
ORDER BY r.name, t.type, t.sellStatus;
package database.dao;

import database.model.Point;
import database.model.User;
import database.session.PointsHibernateSession;
import database.session.UserHibernateSession;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Example;
import org.hibernate.query.Query;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import java.io.Serializable;
import java.util.List;

@Stateless
@LocalBean
public class PointsDAO implements Serializable {

    @EJB
    private UsersDAO usersDAO;

    @EJB
    private PointsHibernateSession phs;

    public boolean addUserPoint(String username, String x, String y, String r) {
        Session session = null;
        Transaction tx1 = null;
        try {
            User user = usersDAO.getUser(username);
            Point point = new Point(user, x, y, r);
            if (point.getUser() == null) {
                return false;
            } else {
                session = phs.getSessionFactory().openSession();
                tx1 = session.beginTransaction();
                session.save(point);
                tx1.commit();
                return true;
            }
        } catch (Exception e) {
            return false;
        } finally {
            session.close();
        }
    }

    public boolean clearUserPoints(String username) {
        Session session = null;
        Transaction tx1 = null;
        try {
            session = phs.getSessionFactory().openSession();
            tx1 = session.beginTransaction();
            User user = usersDAO.getUser(username);
            session.createQuery("DELETE FROM Point p WHERE p.user = ?1").setParameter(1, user).executeUpdate();
            tx1.commit();
            return true;
        } catch (Exception e){
            return false;
        } finally {
            session.close();
        }
    }

    public List<Point> getUserPoints(String username) {
        Session session = null;
        Transaction tx1 = null;
        try {
            session = phs.getSessionFactory().openSession();
            tx1 = session.beginTransaction();
            User user = usersDAO.getUser(username);
            Query<Point> pointsQuery = session.createQuery("FROM Point p WHERE p.user = ?1", Point.class).setParameter(1, user);
            List<Point> res = pointsQuery.getResultList();
            tx1.commit();
            return res;
        } catch (Exception e){
            return null;
        } finally {
            session.close();
        }
    }
}

import { notification } from 'antd';

class NotificationCenter {
    private static instance: NotificationCenter;

    private constructor() { }
    public static getInstance(): NotificationCenter {
        if (!NotificationCenter.instance) {
            NotificationCenter.instance = new NotificationCenter();
        }
        return NotificationCenter.instance;
    }

    notificationErr = (error: string) => {
        notification["error"]({
            message: "Error",
            description: error,
        });
    }
}

export default NotificationCenter;





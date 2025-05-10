import { Clock, Mail, MapPin, Phone } from 'lucide-react';

interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: 'Về chúng tôi',
    subtitle: 'Hà Nội, Việt Nam',
    icon: <MapPin className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Liên hệ chúng tôi',
    subtitle: '+64 123 456 789',
    icon: <Phone className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Giờ làm việc',
    subtitle: 'Thứ 2 - Thứ 7: 10:00 AM-7:00 PM',
    icon: <Clock className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
  {
    title: 'Email chúng tôi',
    subtitle: 'E-mart@gmail.com',
    icon: <Mail className="h-6 w-6 text-gray-600 group-hover:text-darkColor transition-colors" />,
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b">
      {data.map((item, index) => (
        <ContactItem key={index} icon={item.icon} title={item.title} content={item.subtitle} />
      ))}
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactItem = ({ icon, title, content }: ContactItemProps) => {
  return (
    <div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
      {icon}
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-darkColor transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 transition-colors">
          {content}
        </p>
      </div>
    </div>
  );
};

export default FooterTop;

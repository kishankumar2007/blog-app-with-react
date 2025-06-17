import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const userData = useSelector(state => state.auth.userData)
  const Posts = useSelector(state => state.post.allPosts)?.filter(post => post.userId === userData.$id)
  const slug = useParams()
  const navigate = useNavigate()
  let days = []

  const [postNameLabel, setPostNameLabel] = useState([])
  const [postViewsData, setPostViewsData] = useState([])
  const [postThisMonthData, setPostThisMonth] = useState([])
  const [totalViews, setTotalViews] = useState(0)
  const [avgPost, setAvgPost] = useState(0)

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const totalDaysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  for (let index = 1; index <= totalDaysInCurrentMonth; index++) {
    days.push(index)
  }

  const postPerDayData = {
    labels: days,
    datasets: [
      {
        label: 'Per day Post',
        data: postThisMonthData,
        backgroundColor: '#14b8a6',
        borderRadius: 6,
      },
    ],
  };

  const viewsPerPostData = {
    labels: postNameLabel,
    datasets: [
      {
        label: 'Views Per Post',
        data: postViewsData,
        backgroundColor: 'royalblue',
        borderRadius: 6,
      },
    ],
  };

  useEffect(() => {
    if (!userData) navigate('/')
    let postLabel = [];
    let postView = [];
    let totalPostViews = 0
    const postCounts = {};

    Posts.forEach(post => {
      const title = post.title.length > 10? post.title.slice(0,10)+'...': post.title
      postLabel.push(title);
      postView.push(post.Views);
      totalPostViews += post.Views
    });
    Posts.forEach(post => {
      const date = new Date(post.$createdAt);
      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
        const day = date.getDate();
        if (postCounts[day]) {
          postCounts[day] += 1;
        } else {
          postCounts[day] = 1;
        }

      }
    });

    let avgPost = Math.ceil(totalPostViews / Posts?.length)

    const dailyData = days.map(day => postCounts[day] || 0)

    setPostThisMonth(dailyData)
    setPostNameLabel(postLabel)
    setPostViewsData(postView)
    setTotalViews(totalPostViews)
    setAvgPost(avgPost)
  }, [userData]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 space-y-8">

      <div className="bg-slate-800 rounded-2xl p-6 shadow-md flex items-center gap-4">

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{userData?.name || "user"}</h2>
          <p className="text-sm text-gray-400">{userData?.email || "user@gmail.com"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-2xl p-4 shadow text-center space-y-1">
          <h4 className="text-sm text-gray-400">Total Posts</h4>
          <p className="text-2xl font-bold">{Posts.length}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 shadow text-center space-y-1">
          <h4 className="text-sm text-gray-400">Total Views</h4>
          <p className="text-2xl font-bold">{totalViews}</p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 shadow text-center space-y-1">
          <h4 className="text-sm text-gray-400">Avg. Views per Post</h4>
          <p className="text-2xl font-bold">{avgPost}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-4 shadow space-y-2">
          <h3 className="font-semibold text-lg">Posts Per Day</h3>
          <Bar data={postPerDayData} />
        </div>

        <div className="bg-slate-800 rounded-2xl p-4 shadow space-y-2">
          <h3 className="font-semibold text-lg">Views Per Post</h3>
          <Bar data={viewsPerPostData} />
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 shadow">
        <h3 className="font-semibold text-lg mb-4">Recent Posts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto">
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="py-2">Title</th>
                <th className="py-2">Created</th>
                <th className="py-2">Views</th>
                <th className="py-2"></th>
              </tr>
             {Posts.map(post => <tr className="border-t border-gray-700">
                <td className="py-2">{post.title}</td>
                <td className="py-2">{new Date(post.$createdAt).toDateString()}</td>
                <td className="py-2">{post.Views}</td>
                <td className="py-2">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded transition">
                    <Link to={`/post/${slug}/${post.$id}/edit`}>Edit</Link>
                    </button>
                </td>
              </tr>)}

          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

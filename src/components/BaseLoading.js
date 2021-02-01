import '../style/BaseLoading.css';

export default function BaseLoading(props = { isShow: false }) {
  return props.isShow && <div className="BaseLoading">Loading...</div>;
}

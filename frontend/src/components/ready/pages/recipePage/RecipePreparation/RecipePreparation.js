import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import './RecipePreparation.css';

function Preparation(props) {
    return <ReactMarkdown children={props.data.preparation} rehypePlugins={[rehypeRaw]}/>
}
  
export default Preparation;
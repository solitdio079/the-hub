import Original from './Original.svg'
import { FaGithub, FaYoutube, FaTwitter } from 'react-icons/fa6'
export default function Footer() {
    return (
      <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
        <aside className="grid-flow-col items-center">
          <img src={Original} width={100}></img>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a>
            <FaTwitter className='w-5 h-5'/>
          </a>
          <a>
            <FaYoutube className="w-5 h-5" />
          </a>
          <a>
            <FaGithub className="w-5 h-5" />
          </a>
        </nav>
      </footer>
    )
}
interface CashIconProps {
  className?: string;
  width?: number;
  height?: number;
}

function CashIcon({ className, width, height }: CashIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 462.085 462.085"
      fill="currentColor"
      width={width}
      height={height}
    >
      <g>
        <path
          d="M452.585,98.818H58.465c-5.247,0-9.5,4.253-9.5,9.5v14.98h-14.98c-5.247,0-9.5,4.253-9.5,9.5v14.979H9.5
		c-5.247,0-9.5,4.253-9.5,9.5v196.49c0,5.247,4.253,9.5,9.5,9.5h394.117c5.247,0,9.5-4.253,9.5-9.5v-14.98h14.978
		c5.247,0,9.5-4.253,9.5-9.5v-14.98h14.99c5.247,0,9.5-4.253,9.5-9.5v-196.49C462.085,103.071,457.832,98.818,452.585,98.818z
		 M46.808,166.777C43.341,180.385,32.607,191.118,19,194.586v-27.809H46.808z M394.117,194.586
		c-13.609-3.467-24.343-14.201-27.811-27.809h27.811V194.586z M346.917,166.777c4.027,24.105,23.095,43.173,47.201,47.199v83.09
		c-24.107,4.026-43.175,23.095-47.201,47.201H66.198C62.172,320.162,43.105,301.094,19,297.067v-83.091
		c24.105-4.028,43.171-23.094,47.198-47.199H346.917z M19,316.457c13.608,3.468,24.342,14.202,27.808,27.811H19V316.457z
		 M366.306,344.267c3.467-13.609,14.202-24.344,27.811-27.811v27.811H366.306z M418.595,319.787h-5.478v-162.51
		c0-5.247-4.253-9.5-9.5-9.5H43.484v-5.479h375.11V319.787z M443.085,295.307h-5.49v-162.51c0-5.247-4.253-9.5-9.5-9.5H67.965v-5.48
		h375.12V295.307z"
        />
        <path
          d="M161.564,311.56c11.817,15.934,27.797,24.708,44.994,24.708c17.198,0,33.178-8.775,44.995-24.708
		c11.187-15.083,17.347-34.984,17.347-56.038c0-21.055-6.16-40.956-17.347-56.038c-11.817-15.934-27.797-24.708-44.995-24.708
		c-17.197,0-33.177,8.775-44.994,24.708c-11.187,15.082-17.347,34.983-17.347,56.038
		C144.218,276.576,150.378,296.478,161.564,311.56z M206.559,317.268c-9.053,0-17.463-3.981-24.423-10.77
		c1.486-12.161,11.868-21.612,24.423-21.612c12.556,0,22.938,9.451,24.424,21.612C224.022,313.287,215.612,317.268,206.559,317.268z
		 M206.562,265.49c-8.022,0-14.549-6.526-14.549-14.548c0-8.022,6.526-14.549,14.549-14.549c8.021,0,14.548,6.526,14.548,14.549
		C221.109,258.963,214.583,265.49,206.562,265.49z M206.559,193.776c23.898,0,43.342,27.699,43.342,61.747
		c0,11.458-2.209,22.189-6.042,31.396c-3.208-5.279-7.508-9.82-12.579-13.322c5.479-5.973,8.83-13.929,8.83-22.655
		c0-18.499-15.05-33.549-33.548-33.549c-18.499,0-33.549,15.05-33.549,33.549c0,8.725,3.35,16.68,8.829,22.653
		c-5.072,3.502-9.374,8.044-12.582,13.324c-3.833-9.206-6.042-19.938-6.042-31.396C163.218,221.475,182.66,193.776,206.559,193.776z
		"
        />
      </g>
    </svg>
  );
}

export default CashIcon;

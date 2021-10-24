export default interface MemberCardType {
  src?: string;
  name: string;
  role?: string;
  kickButtonDisplay?: boolean;
  lastname?: string;
  position?: string;
  onKick?: () => void;
}
